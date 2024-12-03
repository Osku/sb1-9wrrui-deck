import React, { createContext, useContext, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, X } from 'lucide-react';

interface OnboardingStep {
  target: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface OnboardingContextType {
  currentStep: number;
  showOnboarding: boolean;
  nextStep: () => void;
  previousStep: () => void;
  skipOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

const steps: OnboardingStep[] = [
  {
    target: '[data-tour="templates"]',
    title: 'Choose a Template',
    description: 'Start by selecting a template or create your own from scratch.',
    position: 'right',
  },
  {
    target: '[data-tour="tools"]',
    title: 'Customize Your Card',
    description: 'Add text, images, and other elements to design your perfect card.',
    position: 'right',
  },
  {
    target: '[data-tour="export"]',
    title: 'Export Your Creation',
    description: 'Export your cards in various formats or generate them in batch.',
    position: 'bottom',
  },
];

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      skipOnboarding();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        showOnboarding,
        nextStep,
        previousStep,
        skipOnboarding,
      }}
    >
      {children}
      {showOnboarding && <OnboardingOverlay step={steps[currentStep]} />}
    </OnboardingContext.Provider>
  );
}

function OnboardingOverlay({ step }: { step: OnboardingStep }) {
  const context = useContext(OnboardingContext);
  if (!context) return null;

  const { nextStep, skipOnboarding, currentStep } = context;
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    const target = document.querySelector(step.target);
    if (target) {
      const rect = target.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [step.target]);

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div
        className="absolute bg-white rounded-lg shadow-lg p-4 max-w-xs"
        style={{
          top: position.top + position.height + 8,
          left: position.left,
        }}
      >
        <button
          onClick={skipOnboarding}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
        <p className="text-gray-600 mb-4">{step.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">
            Step {currentStep + 1} of {steps.length}
          </span>
          <button
            onClick={nextStep}
            className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
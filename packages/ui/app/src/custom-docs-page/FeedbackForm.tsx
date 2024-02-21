import { useKeyboardPress } from "@fern-ui/react-commons";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { FernButton } from "../components/FernButton";
import { FernDropdown } from "../components/FernDropdown";
import { FernRadioGroup } from "../components/FernRadioGroup";
import { FernTextarea } from "../components/FernTextarea";

interface FeedbackFormProps {
    feedback: "yes" | "no" | undefined;
    onSubmit: (feedbackId: string, message: string) => void;
}

export const FeedbackForm: FC<FeedbackFormProps> = ({ feedback, onSubmit }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [feedbackId, setFeedbackId] = useState<string>();
    const [feedbackMessage, setFeedbackMessage] = useState<string>("");

    const legend = feedback === "yes" ? "What did you like?" : feedback === "no" ? "What went wrong?" : "Feedback";
    const feedbackOptions = useMemo<FernDropdown.Option[]>(() => {
        const options = feedback === "yes" ? POSITIVE_FEEDBACK : feedback === "no" ? NEGATIVE_FEEDBACK : [];
        const transformedOptions: FernDropdown.Option[] = options.map(
            (option): FernDropdown.Option => ({
                type: "value",
                value: option.feedbackId,
                label: option.title,
                helperText: option.description,
                children: (active) =>
                    active ? (
                        <FernTextarea
                            ref={textareaRef}
                            autoFocus={true}
                            className="mt-2 w-full"
                            placeholder="(Optional) Tell us more about your experience"
                            onValueChange={setFeedbackMessage}
                            value={feedbackMessage}
                        />
                    ) : null,
            }),
        );

        if (transformedOptions.length > 0) {
            transformedOptions.push({
                type: "value",
                value: "other",
                label: "Another reason",
                children: (active) =>
                    active ? (
                        <FernTextarea
                            ref={textareaRef}
                            autoFocus={true}
                            className="mt-2 w-full"
                            placeholder="Tell us more about your experience"
                            onValueChange={setFeedbackMessage}
                            value={feedbackMessage}
                        />
                    ) : null,
            });
        }
        return transformedOptions;
    }, [feedback, feedbackMessage]);

    useKeyboardPress({
        key: "Escape",
        onPress: useCallback((e) => {
            if (textareaRef.current === document.activeElement) {
                textareaRef.current?.blur();
                e.stopImmediatePropagation();
            }
        }, []),
        capture: true,
    });

    const handleSubmitFeedback = () => {
        if (feedbackId == null) {
            return;
        }
        onSubmit(feedbackId, feedbackMessage);
    };

    return (
        <form className="p-0">
            <legend className="text-lg font-semibold">{legend}</legend>

            {feedbackOptions.length > 0 ? (
                <FernRadioGroup
                    className="mt-4"
                    value={feedbackId}
                    onValueChange={setFeedbackId}
                    options={feedbackOptions}
                />
            ) : (
                <FernTextarea
                    ref={textareaRef}
                    className="mt-2 w-full"
                    placeholder="Help us improve the docs"
                    onValueChange={setFeedbackMessage}
                    value={feedbackMessage}
                />
            )}

            <FernButton
                full={true}
                intent="primary"
                className="mt-4 rounded-md"
                onClick={handleSubmitFeedback}
                disabled={feedbackId == null}
                size="large"
            >
                Send feedback
            </FernButton>
        </form>
    );
};

interface FeedbackItem {
    feedbackId: string;
    title: string;
    description: string;
    satisfied: boolean;
}

const POSITIVE_FEEDBACK: FeedbackItem[] = [
    {
        feedbackId: "accurate",
        title: "Accurate",
        description: "Accurately describes the product or feature.",
        satisfied: true,
    },
    {
        feedbackId: "solved-my-issue",
        title: "Solved my issue",
        description: "Helped me resolve an issue.",
        satisfied: true,
    },
    {
        feedbackId: "easy-to-understand",
        title: "Easy to understand",
        description: "Easy to follow and comprehend.",
        satisfied: true,
    },
    {
        feedbackId: "product-adoption",
        title: "Helped me decide to use the product",
        description: "Convinced me to adopt the product or feature.",
        satisfied: true,
    },
];

const NEGATIVE_FEEDBACK: FeedbackItem[] = [
    {
        feedbackId: "inaccurate",
        title: "Inaccurate",
        description: "Doesn't accurately describe the product or feature.",
        satisfied: false,
    },
    {
        feedbackId: "hard-to-follow",
        title: "Couldn't find what I was looking for",
        description: "Missing important information.",
        satisfied: true,
    },
    {
        feedbackId: "hard-to-understand",
        title: "Hard to understand",
        description: "Too complicated or unclear.",
        satisfied: true,
    },
    {
        feedbackId: "code-sample-errors",
        title: "Code sample errors",
        description: "One or more code samples are incorrect.",
        satisfied: true,
    },
];

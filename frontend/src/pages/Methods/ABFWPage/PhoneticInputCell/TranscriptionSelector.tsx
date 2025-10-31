import { Flex, Button, Badge } from "@chakra-ui/react";
import React from "react";
import { SourceAndTarget } from "../../../../interfaces/word";

interface Props {
    sourcesAndTargets: { [key: number]: SourceAndTarget };
    setSourcesAndTargets: Function;
    index: number;
}
const TranscriptionSelector = ({
    sourcesAndTargets,
    setSourcesAndTargets,
    index,
}: Props) => {
    const sourceAndTarget: SourceAndTarget | undefined = sourcesAndTargets
        ? sourcesAndTargets[index]
        : undefined;

    const toggleHit = (hitIndex: number) => {
        if (!sourceAndTarget) {
            return;
        }

        const newHits = [...sourceAndTarget.target.hits];
        newHits[hitIndex] = !newHits[hitIndex];

        setSourcesAndTargets((prev: any) => {
            return {
                ...prev,
                [index]: {
                    ...sourceAndTarget,
                    target: {
                        ...sourceAndTarget.target,
                        hits: newHits,
                    },
                },
            };
        });
    };

    if (!sourceAndTarget) {
        console.log("null source and target");
        return null;
    }

    return (
        <Flex gap={1} wrap="wrap">
            {Array.from(sourceAndTarget.target.transcriptionWithoutMarkers).map(
                (phoneme, idx) => (
                    <Badge
                        key={idx}
                        onClick={() => toggleHit(idx)}
                        bg={
                            sourceAndTarget.target.hits[idx]
                                ? "green.600"
                                : "red.600"
                        }
                        color="white"
                        cursor="pointer"
                        px={2}
                        py={1}
                        borderRadius="md"
                        fontSize="sm"
                        size="md"
                        _hover={{ opacity: 0.8 }}
                    >
                        {phoneme}
                    </Badge>
                )
            )}
        </Flex>
    );
};

export default TranscriptionSelector;

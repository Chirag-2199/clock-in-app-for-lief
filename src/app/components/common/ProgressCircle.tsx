import { Box, Text } from 'grommet'

export default function ProgressCircle({ value, label }: {
    value: number
    label: string
}) {
    return (
        <Box align="center">
            <Box
                width="120px"
                height="120px"
                background={`conic-gradient(#228BE6 ${value * 3.6}deg, #EEE 0deg)`}
                round="full"
                align="center"
                justify="center"
            >
                <Box
                    width="100px"
                    height="100px"
                    background="light-1"
                    round="full"
                    align="center"
                    justify="center"
                >
                    <Text size="xlarge" weight="bold">
                        {Math.round(value)}%
                    </Text>
                </Box>
            </Box>
            <Text margin={{ top: 'small' }}>{label}</Text>
        </Box>
    )
}
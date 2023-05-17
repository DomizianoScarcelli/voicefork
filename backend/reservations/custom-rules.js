module.exports = {
    rules: {
        'time-format': {
            create(context) {
                return {
                    Literal(node) {
                        if (
                            typeof node.value === 'string' &&
                            node.value !== 'TimeFormat'
                        ) {
                            context.report({
                                node,
                                message:
                                    'Time should be in the format TimeFormat',
                            })
                        }
                    },
                }
            },
        },
    },
}

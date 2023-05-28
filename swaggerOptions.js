const dotenv = require('dotenv');

dotenv.config();

const { PORT } = process.env;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bosta uptime monitoring RESTful API',
            version: '1.0.0',
            description: 'Documentation for Bosta-Assessment API',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string',
                            description: 'Username of the user',
                        },
                        email: {
                            type: 'string',
                            description: 'Email of the user',
                        },
                        password: {
                            type: 'string',
                            description: 'Password of the user',
                        },
                    },
                },
                Check: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'The unique identifier of the check',
                        },
                        url: {
                            type: 'string',
                            description: 'The URL of the website or resource to check',
                        },
                        user_id: {
                            type: 'string',
                            description: 'The ID of the user associated with the check',
                        },
                        status: {
                            type: 'string',
                            description: 'The current status of the check',
                        },
                        history: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        description:
                                            'The status of the check at a specific point in time',
                                    },
                                    responseTime: {
                                        type: 'number',
                                        description:
                                            'The response time of the check at a specific point in time',
                                    },
                                },
                            },
                        },
                        availability: {
                            type: 'number',
                            description: 'The availability percentage of the check',
                        },
                        outages: {
                            type: 'number',
                            description: 'The total number of outages for the check',
                        },
                        downtime: {
                            type: 'number',
                            description: 'The total downtime duration for the check',
                        },
                        uptime: {
                            type: 'number',
                            description: 'The total uptime duration for the check',
                        },
                        responseTime: {
                            type: 'number',
                            description: 'The average response time for the check',
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerOptions;

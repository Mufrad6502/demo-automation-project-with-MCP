import dotenv from 'dotenv';
dotenv.config();

// Function to get required environment variables
const getRequiredEnvVar = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(
            `Required environment variable "${key}" is not set. ` +
            `Please check your .env file and make sure it contains all required variables. ` +
            `You can use .env.example as a template.`
        );
    }
    return value;
};

export const users = {
    standard: {
        username: getRequiredEnvVar('STANDARD_USER'),
        password: getRequiredEnvVar('STANDARD_PASSWORD')
    },
    locked: {
        username: getRequiredEnvVar('LOCKED_USER'),
        password: getRequiredEnvVar('LOCKED_PASSWORD')
    },
    problem: {
        username: getRequiredEnvVar('PROBLEM_USER'),
        password: getRequiredEnvVar('PROBLEM_PASSWORD')
    },
    performance: {
        username: getRequiredEnvVar('PERFORMANCE_USER'),
        password: getRequiredEnvVar('PERFORMANCE_PASSWORD')
    },
    error: {
        username: 'error_user',
        password: 'secret_sauce'
    },
    visual: {
        username: 'visual_user',
        password: 'secret_sauce'
    }
};

export const testProducts = {
    backpack: {
        name: 'Sauce Labs Backpack',
        price: 29.99
    },
    bikeLight: {
        name: 'Sauce Labs Bike Light',
        price: 9.99
    }
};

export const checkoutInfo = {
    valid: {
        firstName: 'John',
        lastName: 'Doe',
        zipCode: '12345'
    },
    invalid: {
        firstName: '',
        lastName: '',
        zipCode: ''
    }
};
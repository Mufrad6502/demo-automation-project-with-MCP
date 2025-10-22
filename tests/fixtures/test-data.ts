import dotenv from 'dotenv';
dotenv.config();

export const users = {
    standard: {
        username: process.env.STANDARD_USER || 'standard_user',
        password: process.env.STANDARD_PASSWORD || 'secret_sauce'
    },
    locked: {
        username: process.env.LOCKED_USER || 'locked_out_user',
        password: process.env.LOCKED_PASSWORD || 'secret_sauce'
    },
    problem: {
        username: process.env.PROBLEM_USER || 'problem_user',
        password: process.env.PROBLEM_PASSWORD || 'secret_sauce'
    },
    performance: {
        username: process.env.PERFORMANCE_USER || 'performance_glitch_user',
        password: process.env.PERFORMANCE_PASSWORD || 'secret_sauce'
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
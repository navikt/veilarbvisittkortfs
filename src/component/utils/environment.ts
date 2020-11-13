class Environment {
    get nodeEnv() {
        return process.env.NODE_ENV;
    }

    get isProduction() {
        return this.nodeEnv === 'production';
    }

    get isDevelopment() {
        return this.nodeEnv === 'development';
    }

    get isMock() {
        return process.env.REACT_APP_MOCK === 'true';
    }
}

export default new Environment();

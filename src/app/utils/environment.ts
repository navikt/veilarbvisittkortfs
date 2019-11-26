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
}

export default new Environment();

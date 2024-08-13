declare const _default: (() => {
    sms: {
        twilio: {
            accountSid: string;
            authToken: string;
            from: string;
        };
    };
    email: {
        host: string;
        port: number;
        user: string;
        pass: string;
        from: string;
    };
}) &
    import('@nestjs/config').ConfigFactoryKeyHost<{
        sms: {
            twilio: {
                accountSid: string;
                authToken: string;
                from: string;
            };
        };
        email: {
            host: string;
            port: number;
            user: string;
            pass: string;
            from: string;
        };
    }>;
export default _default;

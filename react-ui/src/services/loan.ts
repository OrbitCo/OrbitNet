class Loan {
    get serverUrl() {
        const protocol = process.env.REACT_APP_HTTPS === "true" ? "https:" : "http:";
        const host = process.env.REACT_APP_SERVER_HOST;
        let url = `${protocol}//${host}`;

        if (process.env.REACT_APP_SERVER_PORT) {
            url += `:${process.env.REACT_APP_SERVER_PORT}`;
        }

        return url;
    }

    create(data: any): Promise<any> {
        return fetch(`${this.serverUrl}/api/loans`, {
            method: "POST",
            body: JSON.stringify(data),
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then((response: Response) => response);
    }
}

export default new Loan();

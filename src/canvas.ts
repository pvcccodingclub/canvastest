export default class Canvas {
    Astro: any;

    constructor(Astro: any) {
        this.Astro = Astro;
    }

    async request(endpoint: string, init: RequestInit = {}) {
        if (!this.Astro) {
            throw new Error('Astro instance is undefined.');
        }
        if (!this.Astro.locals || !this.Astro.locals.runtime || !this.Astro.locals.runtime.env) {
            throw new Error('Astro.locals.runtime.env is undefined.');
        }
        const { env } = this.Astro.locals.runtime;
        if (!init.headers) init.headers = {};
        init.headers['Authorization'] = `Bearer ${env._TEST_CANVAS_ACCESS_TOKEN}`;
        const response = await fetch(`https://canvas.instructure.com/api/v1/${endpoint}`, init);
        return await response.json();
    }

    async getUser(userId: number|string='self') {
        return await this.request(`users/${userId}`);
    }
}

// export Interface for mockDB.store 
export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    img: string;
    amount?: number;
};

const store: IProduct[] = [
    {
        id: 'aP8XXwZ9U3JXHdTOzAkyZ8',
        name: 'Tommy - Cold brewing',
        description: 'also called cold water extraction or cold pressing',
        price: 7.5,
        currency: 'USD',
        img: 'https://media.istockphoto.com/photos/cold-brew-coffee-picture-id1194409397?k=20&m=1194409397&s=612x612&w=0&h=jG9ZkKmW1RriJNt22Sv64LRBzk8UHfE7xeoV_k3A-SA='
    },
    {
        id: 'gKc3TJUAueD8ydNOr6I',
        name: 'Freddo - Turkish coffee',
        description: 'Beans for Turkish coffee are ground to a fine powder.',
        price: 8.55,
        currency: 'USD',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/T%C3%BCrk_Kahvesi_-_Bakir_Cezve.jpg/1024px-T%C3%BCrk_Kahvesi_-_Bakir_Cezve.jpg'
    },
    {
        id: 'Af46nIX6xvUmn96c0Yvd9',
        name: 'Jummy - Vacuum coffee',
        description: ' using two chambers where vapor pressure and vacuum produce coffee. ',
        price: 10.25,
        currency: 'USD',
        img: 'https://images.unsplash.com/photo-1551590989-4b76b51b2e28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80'
    }
]

const mockDB = {
    store,
    getFirstProduct: (): IProduct => {
        return mockDB.store[0];
    },
    getProductById: (id: string) => {
        return mockDB.store.find(product => product.id === id);
    }
};


export { mockDB };


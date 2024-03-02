import Account from "./Account";

interface Team {
    id: string,
    name: string,
    image: string,
    certificate: string,
    accounts: [Account]
}

export default Team
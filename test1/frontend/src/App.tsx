import './App.scss'

function App() {

    const [database, setDatabase] = useState<IDatabase[]>([]);

    useEffect(() => {
        const axiosDatabase = async () => {
            const response = await axios('http://localhost:3000/database');
            setDatabase(response.data);
        };
        axiosDatabase()
    }, []);


    return (
        <div className="App">
            <h1>Welcome to SWEETSTACK</h1>
            <p>Visit <a href={'#'}>documentary</a></p>
        </div>
    )
}

export default App


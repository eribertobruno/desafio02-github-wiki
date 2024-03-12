import { useState } from "react";
import gitlogo from "../assets/github.png";
import Input from "../components/Input";
import Button from "../components/Button";
import ItemRepo from "../components/ItemRepo";
import {Container} from "./styles";
import {api} from "../services/api"
function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSeachRepo = async () => {
    console.log(currentRepo);
    const {data} = await api.get(`repos/${currentRepo}`);
    console.log({data});
    if(data.id){
      const isExist = repos.find(repo => repo.id === repo.data.id)

      if(!isExist){
        setRepos(prev=> [...prev, data]);
        setCurrentRepo('');
        return;
      }
      alert("Repositorio já existe")
    }
  }

  return (
    <Container>
      <img src={gitlogo} width={72} height={72} alt="github logo" />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}></Input>
      <Button onClick={handleSeachRepo}/>
      {repos.map(repo => <ItemRepo repo={repo}/>)}
    </Container>
  );
}

export default App;

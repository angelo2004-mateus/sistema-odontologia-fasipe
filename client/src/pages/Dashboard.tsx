import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import HomeCard from '@/components/HomeCard'

const Dashboard = () => {
  const navigate = useNavigate()

  // Função para navegar para um link externo aleatório
  const goToRandomExternalLink = () => {
    const externalLinks = [
      'https://example.com/consulta1', // Link de exemplo
      'https://example.com/consulta2', // Outro link
      'https://example.com/consulta3', // Mais links
    ]
    
    // Escolher um link aleatório da lista
    const randomLink = externalLinks[Math.floor(Math.random() * externalLinks.length)]
    
    // Abre o link externo em uma nova aba
    window.open(randomLink, '_blank')
  }

  return (
    <div>
      <HomeCard />
      <Button type="primary" onClick={goToRandomExternalLink}>
        Agendar consulta
      </Button>
      <Button type="primary" onClick={() => navigate('/profissional')}>
        Listar Profissionais
      </Button>
      <Button type="primary" onClick={() => navigate('/paciente')}>
        Cadastrar Paciente
      </Button>
    </div>
  )
}

export default Dashboard

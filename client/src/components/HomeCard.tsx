import React, { useEffect, useState } from "react";
import { Card, Col, Typography, Layout, Skeleton } from "antd";
import { RiFileCopyLine } from "react-icons/ri"; // Para Pacientes
import { CgDanger } from "react-icons/cg"; // Para Profissionais
import { FiAlertTriangle } from "react-icons/fi"; // Para Anamneses
import { CgShoppingCart } from "react-icons/cg"; // Para Consultas
import { fetchData } from "@/utils/api/fetchData";

interface DataCounts {
  patients: number;
  professionals: number;
  anamneses: number;
  consultations: number;
}

interface CardData {
  icon: JSX.Element;
  title: string;
  color: string;
}

const HomeCard: React.FC = () => {
  const { Title, Text } = Typography;
  const { Content } = Layout;

  const [dataCounts, setDataCounts] = useState<DataCounts>({
    patients: 0,
    professionals: 0,
    anamneses: 0,
    consultations: 0,
  });

  const [loading, setLoading] = useState(true);

  // Dados dos cards
  const cardData: Record<string, CardData> = {
    patients: {
      icon: <RiFileCopyLine color="white" size={20} />,
      title: "Pacientes Cadastrados",
      color: "#13c2c2",
    },
    professionals: {
      icon: <CgDanger color="white" size={20} />,
      title: "Profissionais Cadastrados",
      color: "#F5222D",
    },
    anamneses: {
      icon: <FiAlertTriangle color="white" size={20} />,
      title: "Anamneses Feitas",
      color: "#FA8C16",
    },
    consultations: {
      icon: <CgShoppingCart color="white" size={20} />,
      title: "Consultas Realizadas",
      color: "#20C997",
    },
  };

  // Função para buscar dados
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const [
        patientsResponse,
        professionalsResponse,
        anamnesesResponse,
        consultationsResponse,
      ] = await Promise.all([
        fetchData<{ data: any[] }>("/paciente/todos_pacientes"), // Certifique-se de que o retorno é do tipo esperado
        fetchData<{ data: any[] }>("/profissional/todos_profissionais"),
        fetchData<{ data: any[] }>("/anamnese/listar"),
        fetchData<{ data: any[] }>("/consultas/todas_consultas"),
      ]);

      // Verifica se não houve erro
      if (!patientsResponse.error) {
        setDataCounts((prev) => ({
          ...prev,
          patients: patientsResponse.data.length,
        }));
      }

      if (!professionalsResponse.error) {
        setDataCounts((prev) => ({
          ...prev,
          professionals: professionalsResponse.data.length,
        }));
      }

      if (!anamnesesResponse.error) {
        setDataCounts((prev) => ({
          ...prev,
          anamneses: anamnesesResponse.data.length,
        }));
      }

      if (!consultationsResponse.error) {
        setDataCounts((prev) => ({
          ...prev,
          consultations: consultationsResponse.data.length,
        }));
      }

      setLoading(false);
    };

    fetchDataFromAPI();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout style={{ background: "white" }}>
      <Title level={2}>Dashboard</Title>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {Object.keys(cardData).map((key) => (
          <Col xs={24} sm={12} md={12} lg={6} xl={6} key={key}>
            <Card
              className="card"
              style={{
                backgroundColor: cardData[key as keyof typeof cardData].color,
                margin: "10px", // Adicionando margem entre os cards
                color: "white", // Cor do texto do card
              }}
            >
              <Skeleton
                avatar={{ size: 22, style: { margin: 0, padding: 0 } }}
                active
                loading={loading}
                paragraph={{
                  rows: 2,
                  style: { padding: 0, margin: 0 },
                }}
              >
                <Content className="card-header">
                  {cardData[key as keyof typeof cardData].icon}
                  <Typography.Text style={{ color: 'white' }}>
                    {cardData[key as keyof typeof cardData].title}
                  </Typography.Text>
                </Content>
                <Content className="card-body">
                  <Title level={3} style={{ color: "white" }}>
                    {dataCounts[key as keyof DataCounts]}
                  </Title>
                  <Text style={{ color: "white", whiteSpace: "nowrap" }}>
                    {dataCounts[key as keyof DataCounts] === 0 &&
                      `Nenhum ${cardData[
                        key as keyof typeof cardData
                      ].title.toLowerCase()}`}
                    {dataCounts[key as keyof DataCounts] === 1 &&
                      `1 ${cardData[
                        key as keyof typeof cardData
                      ].title.toLowerCase()}`}
                    {dataCounts[key as keyof DataCounts] > 1 &&
                      `${dataCounts[key as keyof DataCounts]} ${cardData[
                        key as keyof typeof cardData
                      ].title.toLowerCase()}`}
                  </Text>
                </Content>
              </Skeleton>
            </Card>
          </Col>
        ))}
      </div>
    </Layout>
  );
};

export default HomeCard;

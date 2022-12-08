import React, { useEffect, useState } from 'react';
import './scss/golbal.scss';
import { useSelector, useDispatch } from 'react-redux'
import { fetchDataCountry } from './features/country';
import { Col, Container, Row } from 'react-bootstrap';
import { Modal, Spin, Button, Select } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchDataDetail } from './features/detailCountry';

const App = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const countries = useSelector((state) => state.countries.data)
  const statusCountries = useSelector((state) => state.countries.status)
  const detail = useSelector((state) => state.detail.detail)
  const statusDetail = useSelector((state) => state.detail.status)

  useEffect(() => {
    dispatch(fetchDataCountry({search}));
  }, [dispatch, search]);

  const detailCountry = (code) => {
    dispatch(fetchDataDetail({ code }));
    setIsModalVisible(true);
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleChange = (value) => {
    setSearch(value);
  };

  return (
    <Container>
      <Row className='my-2'>
        <Col md={8} xs={6}>
          <h4>List of countries</h4>
        </Col>
        <Col md={4} xs={6}>
          <Select
            defaultValue="1"
            onChange={handleChange}
            options={[
              {
                value: '1',
                label: 'Total Confirmed',
              },
              {
                value: '2',
                label: 'Total Deaths',
              },
              {
                value: '3',
                label: 'Total Recovered',
              },
            ]}
          />
        </Col>
      </Row>
      {
        statusCountries == 'loading' ? (
          <Row>
            <Col className='text-center'><Spin /></Col>
          </Row>
        ) : (
          <>
            {
              countries.map((country) => (
                <Row key={country.ID} className="my-2 py-2 wrraped_country">
                  <Col md={12} xs={12}>
                    <div className="cursor_pointer" onClick={(e) => detailCountry(country.CountryCode)}>
                      <h5 className='name_country'>Name contry: { country.Country }</h5>
                      <p className='mb-0'>Total Confirmed: { country.TotalConfirmed.toLocaleString() }</p>
                      <p className='mb-0'>Total Deaths: { country.TotalDeaths.toLocaleString() }</p>
                      <p className='mb-0'>Total Recovered: { country.TotalRecovered.toLocaleString() }</p>
                    </div>
                  </Col>
                </Row>
              ))
            }
          </>
        )
      }
      <Modal title="Detail country" 
        visible={isModalVisible} 
        onOk={handleOk} 
        closable={false}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Ok
          </Button>,
        ]}
      >
        {
          statusDetail == 'loading' ? (
            <Row>
              <Col className='text-center'><Spin /></Col>
            </Row>
          ) : (
            <>
              {
                detail && (
                  <Row>
                    <Col sm={5} className='flag'>
                      <img src={detail.flag} width={'100%'} alt=""/>
                    </Col>
                    <Col sm={7}>
                      <div className="name_detail">
                        <span>Name: </span>
                        <span className='mx-1'>{ detail.name }</span>
                      </div>
                      <div className="population_detail">
                        <span>Population: </span>
                        <span className='mx-1'>{ detail.population.toLocaleString() }</span>
                      </div>
                      <div className="capital_detail">
                        <span>Capital: </span>
                        <span className='mx-1'>{ detail.capital }</span>
                      </div>
                      <div className="region_detail">
                        <span>Region: </span>
                        <span className='mx-1'>{ detail.region }</span>
                      </div>
                      <div className="subregion_detail">
                        <span>Subregion: </span>
                        <span className='mx-1'>{ detail.subregion }</span>
                      </div>
                    </Col>
                  </Row>
                )
              }
            </>
          )
        }
      </Modal>
  </Container>
  );
};

export default App;
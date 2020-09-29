import React, { useEffect, useState } from "react";
import lodash from "lodash";
import { AutoSizer, Column, Table } from "react-virtualized";
import { Form, Col, Spinner } from "react-bootstrap";

import { getUsers } from "services/api";

import "react-virtualized/styles.css";
import "./styles.css";

const WrappedSpinner = () => (
  <div className="wrapper-spinner">
    <Spinner animation="border" />
  </div>
);

export default () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchAge, setSearchAge] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const resp = await getUsers();

      if (resp.status !== 200) {
        return;
      }

      const {
        data: { data },
      } = resp;

      setUsers(data);
      setFilteredUsers(data);
      setLoading(false);
    };

    load();
  }, []);

  const changeSearchName = ({ target: { value } }) => {
    setSearchName(value);
    debouncedFilter(value);
  };

  const changeSearchAge = ({ target: { value } }) => {
    setSearchAge(value);
    debouncedFilter(value);
  };

  const debouncedFilter = lodash.debounce((s) => filterList(s), 800);

  const filterList = (value) => {
    let arrFiltered = [];

    if (users.length !== filteredUsers.length && filteredUsers.length > 0 
      && searchAge !== "" && searchName !== "")  {
      arrFiltered = filteredUsers.filter(
        ({ name, age }) => !!name.includes(value) || age.toString() === value
      );
    }
    else {
      arrFiltered = users.filter(
        ({ name, age }) => !!name.includes(value) || age.toString() === value
      );
    }
    setFilteredUsers(arrFiltered);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="wrapper-p">
        <Form>
          <Form.Row>
            <Col>
              <Form.Control
                name="FilterName"
                placeholder="Digite o 'nome' para filtrar"
                onChange={changeSearchName}
                value={searchName}
                disabled={!!loading}
              />
            </Col>
            <Col>
              <Form.Control
                name="FilterAge"
                placeholder="Digite a 'idade' para filtrar"
                onChange={changeSearchAge}
                value={searchAge}
                disabled={!!loading}
              />
            </Col>
          </Form.Row>
        </Form>

        <div className="wrapper-list">
          <AutoSizer>
            {({ width, height }) => (
              <Table
                width={width}
                height={height}
                headerHeight={40}
                rowHeight={35}
                rowCount={filteredUsers.length}
                rowGetter={({ index }) => filteredUsers[index]}
                noRowsRenderer={() => (loading ? <WrappedSpinner /> : null)}
              >
                <Column label="Nome" dataKey="name" width={350} />
                <Column label="Idade" dataKey="age" width={150} />
              </Table>
            )}
          </AutoSizer>
        </div>
      </div>
    </div>
  );
};

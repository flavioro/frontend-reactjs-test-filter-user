import React, { useEffect, useState } from "react";
import { AutoSizer, Column, Table } from "react-virtualized";
import { Form, Col, Spinner } from "react-bootstrap";
import _ from "lodash";

import { getUsers } from "services/api";

import "react-virtualized/styles.css";
import "./styles.css";

const WrappedSpinner = () => (
  <div className="wrapper-spinner">
    <Spinner animation="border" />
  </div>
);

export default () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchAge, setSearchAge] = useState("");

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
    debouncedSearch(value);
  };

  const changeSearchAge = ({ target: { value } }) => {
    setSearchAge(value);
    debouncedSearch(value);
  };

  const debouncedSearch = _.debounce((s) => filterList(s), 800);

  const filterList = (value) => {
    const arrFiltered = users.filter(
      // ({ name, age }) => !!name.includes(value) || !!`${age}`.includes(value)
      ({ name, age }) => !!name.includes(value) || age.toString() === value
    );
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
                placeholder="Digite o 'nome' ou a 'idade' para filtrar"
                onChange={changeSearchName}
                value={searchName}
                disabled={!!loading}
              />
            </Col>
            <Col>
              <Form.Control
                name="FilterAge"
                placeholder="Digite o 'nome' ou a 'idade' para filtrar"
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

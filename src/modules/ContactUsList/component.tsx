import React, {useEffect, useState} from 'react';
import { Feedback } from '../../entity/Feedback';
import axios from 'axios';
import Pagination from 'rsuite/Pagination';
import { Button, Input, InputGroup } from 'rsuite';

type Pager = {
  current: number;
  size?: number;
  q?: any
}

type Data = {
  total: number;
  records: Feedback[];
}

const ContactUsList = () => {
  const [data, setData] = useState<Data>({ total: 1, records: [] });
  const [pagination, setPagination] = useState<Pager>({
    current: 1,
    size: 10,
  });
  const [keySearched, setKeySearched] = useState<string>();

  const { total, records } = data;

  const fetchData = (data: Pager) => {
    return axios.request({
      method: 'GET',
      url: '/contactus',
      params: data
    })
  };

  const onPageChange = async (current: number) => {
    const newPager = { ...pagination, current };
    setPagination(newPager);
    const { data } = await fetchData(newPager);
    setData(data);
  };

  const onUpdateKeySearched = (value: string) => {
    setKeySearched(value);
  }

  const onSearch = async () => {
    const newPager = { ...pagination, q: keySearched };
    const { data } = await fetchData(newPager);
    setData(data);
  }

  useEffect(() => {
    fetchData(pagination).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div style={{ width: '640px', margin: '20px auto' }}>
      <div>
        <h4 style={{ marginBottom: '20px' }}>Contacts</h4>
        <InputGroup>
          <Input onChange={onUpdateKeySearched} />
          <InputGroup.Addon>
            <Button size="xs" onClick={onSearch}>Search</Button>
          </InputGroup.Addon>
        </InputGroup>
      </div>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Phone</td>
            <td>Email</td>
            <td>Avaiable On</td>
            <td>Type</td>
          </tr>
        </thead>
        <tbody>
          {records.map((each, i) => (
            <tr key={i}>
              <td>{each.name}</td>
              <td>{each.phone}</td>
              <td>{each.email}</td>
              <td>{each.availableOn}</td>
              <td>{each.tellMeAboutYou}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        total={total}
        limit={pagination.size}
        activePage={pagination.current}
        onChangePage={onPageChange}
      />
    </div>
  )
};

export default ContactUsList;
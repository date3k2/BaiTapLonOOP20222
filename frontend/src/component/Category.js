import React, { useState, useEffect } from 'react'
import { Stack, Form } from 'react-bootstrap'
import apiServices from '../services/apiServices';

export default function Category({handleCategory}) {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiServices.getCategory()
    .then(res => setCategories(res.data))
    .catch(err => console.log(err));
    }, []);

  return (
    <Stack direction='horizontal'>
      <p className='me-2 mt-2'>Select a category: </p>
      <Form.Select style={{width: "250px"}} defaultValue='-1' onChange={handleCategory}>
        <option value='-1' disabled hidden>--- Select a category ---</option>
        <option value='0'>Default</option>
          {
            categories.map((item, index) => {
            let space = `${'\xa0'.repeat(item.level*2)}`;
            return <option key={index} value={item.id}>{space} {item.name} ({item.numberOfQuestions})</option>
          })
        } 
      </Form.Select>
    </Stack>
  )
}

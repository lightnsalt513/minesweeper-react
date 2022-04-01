import React from 'react'
import styled from 'styled-components'

const RecordList = ({ scores }) => {
  const createDate = (time) => {
    return new Date(time).toLocaleString()
  }

  return (
    <Container>
      <Title>나의 최고기록 Top 10</Title>
      <List>
        {scores.map((score, idx) => (
          <ListItem key={score[1]}>
            {idx + 1}.
            <strong>
              {score[0]} 초 <span>({createDate(score[1])})</span>
            </strong>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

const Container = styled.div`
  max-width: 500px;
  padding: 20px;
  margin: 40px auto 0;
  background: #fff7ed;
  text-align: left;
  box-sizing: border-box;
`

const Title = styled.h2`
  font-size: 20px;
`

const List = styled.ol`
  margin-top: 20px;
`

const ListItem = styled.li`
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }

  strong {
    display: inline-block;
    margin-left: 18px;
  }

  span {
    display: inline-block;
    margin-left: 10px;
    color: #777;
    font-size: 12px;
  }
`

export default React.memo(RecordList)

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: conic-gradient(red, yellow, green, pink, blue);
`;

export const Panel = styled.div`
  padding: 10px;
  border: 1px solid #eeeeee;
`;

export const Row = styled.div``;

export const Topic = styled.div`
  font-size: 20px;
  font-weight: bold;
  font-family: sans-serif;
  background: orange;
  padding: 10px;
`;

export const TopicDetail = styled.div`
  font-size: 18px;
  font-family: sans-serif;
`;

export const RowPanel = styled.div``;

export const TextPanel = styled.input`
  width: 100%;
  border: 1px solid;
  font-size: 22px;
`;

export const Button = styled.button`
  width: 150px;
  height: 35px;
  background: #3f51b5;
  padding: 0px;
  border: 0px;
  color: white;
  font-size: 18px;
`;

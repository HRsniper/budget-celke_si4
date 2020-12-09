import { GetStaticProps } from "next";

interface Budget {
  _id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  msg: string;
  createdAt: string;
  updatedAt: string;
}

interface Budgets {
  budgets: Budget[];
}

const Budget = ({ budgets }: Budgets) => {
  return (
    <>
      <strong>{budgets.length}</strong>
      {budgets.map((budget) => (
        <ul key={budget._id}>
          <li>{budget.name}</li>
          <li>{budget.email}</li>
          <li>{budget.phone}</li>
          <li>{budget.msg}</li>
        </ul>
      ))}
    </>
  );
};

export default Budget;

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("http://localhost:3333/budget");
  const { budgets }: Budgets = await response.json();

  return {
    props: {
      budgets,
    },
    revalidate: 60,
  };
};

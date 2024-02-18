import { Input } from 'antd';
import { SearchProps } from 'antd/lib/input';

const PredictPage: React.FC = () => {
  const onSearch: SearchProps['onSearch'] = (value, event, info) => {
    const query = value;
    console.log(query);
  };
  return (
    <main className="min-h-full">
      <section className="mb-4">
        <Input.Search onSearch={onSearch}></Input.Search>
      </section>
    </main>
  );
};

export default PredictPage;

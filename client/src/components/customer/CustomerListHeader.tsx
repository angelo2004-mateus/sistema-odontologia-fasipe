import React from 'react';
import { Input } from 'antd';

interface CustomerListHeaderProps {
  onSearch: (searchText: string) => void;
}

const CustomerListHeader: React.FC<CustomerListHeaderProps> = ({ onSearch }) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div>
      <Input
        placeholder="Pesquisar"
        onChange={handleSearch}
        style={{ marginBottom: 16 }}
      />
    </div>
  );
};

export default CustomerListHeader;

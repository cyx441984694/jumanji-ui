import React, { useContext, useEffect, useRef, useState } from 'react';
import './index.css';
import { Drawer, InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Select, Table,Flex, Row, Col } from 'antd';
import type { FormInstance } from 'antd/es/form';
import Setting from './Setting';


const EditableContext = React.createContext<FormInstance<any>|null>(null);
const { Option } = Select;
interface Item {
  key: string;
  name: string;
  stage: string;
  task: string;
  plugin: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
  stage: string;
  task: string;
  plugin: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const TableComponent: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: '0',
      name: 'webhook',
      stage: 'stage1',
      task: 'task1',
      plugin: 'jenkins',
    },
  ]);

  const [count, setCount] = useState(2);



  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleSelectChange = (value,index) => {
    const newData = [...dataSource];
    newData[index].plugin = value;
    setDataSource(newData);
  }

  const plugins = [
        {label: 'jenkins', value: 'jenkins'},
        {label: 'command', value: 'command'},
        {label: 'github', value: 'github'}
  ];


  // drawer Setting  
  const [visible, setVisible] = useState(false);

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      editable: true,
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      width: '20%',
      editable: true,
    },
    {
      title: 'Task',
      dataIndex: 'task',
      width: '20%',
      editable: true,
    },
    {
      title: 'Plugin',
      dataIndex: 'plugin',
      width: '20%',
      render: (plugin, record, index) =>(
        <Select value={plugin} onChange={(value) => handleSelectChange(value,index)}>
          {plugins.map((item)=>
          <Option value={item.value} key={index}>{item.label}</Option>
          )}
        </Select>
      )
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <div>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}><a>Delete</a></Popconfirm>
          {/* reference: https://codesandbox.io/p/sandbox/submit-form-in-drawer-antd-5-11-4-ws45d4?file=%2Fdemo.tsx */}
          <Button type="text" onClick={()=>{setVisible(true);}}>Configure</Button>
          <Drawer width={800} title="Configure" placement="right" visible={visible} closable={false} onClose={()=> {setVisible(false)}}>
          <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="Credential"
                    label="Credential"
                    rules={[{ required: true, message: 'Please select credential' }]}
                  >
                    <Select placeholder="Please select credential">
                      <Option value="winnie">Winnie Chen</Option>
                      <Option value="sa">Service account</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Configuration"
                    label="Configuration"
                    rules={[{ required: true, message: 'Please enter its configuration link' }]}
                  >
                    <Input placeholder="Please enter its configuration link"/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                      {
                        required: true,
                        message: 'please enter description',
                      },
                    ]}
                  >
                    <Input.TextArea rows={4} placeholder="please enter description" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Drawer>
          </div>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      name: 'webhook',
      stage: 'stage1',
      task: 'task1',
      plugin: 'plugin',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Flex gap="small" wrap = "wrap" style={{ float: 'right' }}>
      <Button onClick={handleAdd} type="primary" > Add task </Button>
      <Button > Run </Button>
      <Button > Schedule </Button>
      </Flex>
      <br></br>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};


export default TableComponent;

import React from "react";
import { Input, InputNumber, Form } from "antd";

export default function EditableCell({
  editing,
  onSave,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) {
  const inputNode =
    inputType === "number" ? (
      <InputNumber
        style={{ fontSize: 12 }}
        onKeyPress={(e) => {
          e.key === "Enter" && onSave();
        }}
      />
    ) : (
      <Input
        style={{ fontSize: 12 }}
        onKeyPress={(e) => {
          e.key === "Enter" && onSave();
        }}
      />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
}

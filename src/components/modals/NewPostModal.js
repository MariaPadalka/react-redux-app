import { Modal, Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { createPost } from "../../thunks/postsSlice";
import { message } from "antd";

const NewPostModal = ({ visible, onCancel, userId }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      dispatch(
        createPost({
          userId: userId,
          title: values.title,
          body: values.body,
        })
      );

      form.resetFields();
      onCancel();
    } catch (error) {
      message.error("Enter valid data");
    }
  };

  return (
    <Modal
      title="Create New Post"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="create" type="primary" onClick={handleCreate}>
          Create
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="body"
          label="Body"
          rules={[{ required: true, message: "Please input the body!" }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewPostModal;

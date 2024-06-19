import { Modal, Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { updatePost } from "../../thunks/postsSlice";

const EditPostModal = ({ visible, onCancel, post, setPost }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const updatedPost = { ...post, title: values.title, body: values.body };

      await dispatch(updatePost(updatedPost)).unwrap();

      setPost(updatedPost);
      form.resetFields();
      onCancel();
    } catch (error) {
      message.error(`Error occured. Enter valid data`);
    }
  };

  return (
    <Modal
      title="Edit Post"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleUpdate}>
          Save
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ title: post.title, body: post.body }}
      >
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

export default EditPostModal;

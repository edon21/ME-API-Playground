import React from "react";
import { Form, Input, Button, Card } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PortfolioForm = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate()

const onFinish = async (values) => {
  try {
    const response = await axios.post(
      "https://me-api-playground.vercel.app/api/profile/createProfile",
      values
    );
    console.log("Profile Saved:", response.data);
    alert("Profile created successfully!");
    navigate("/profileTable");
  } catch (error) {
    if (error.response?.status === 400) {
      alert(error.response.data.message || "Profile already exists");
    } else {
      console.error("Error saving profile:", error.response?.data || error.message);
      alert(`Failed to create profile: ${error.response?.data?.message || "Server Error"}`);
    }
  }
};

  return (
    <div
      style={{
        minHeight: "100vh", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        padding: "20px",
      }}
    >
      <Card
        title="Portfolio Form"
        bordered={false}
        style={{
          width: "700px",
          maxHeight: "90vh",
          overflowY: "auto", 
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "12px",
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            projects: [
              {
                title: "",
                description: "",
                workLink: "",
                github: "",
                linkedin: "",
                portfolio: "",
              },
            ],
          }}
        >
         
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Education"
            name="education"
            rules={[{ required: true, message: "Please enter your education" }]}
          >
            <Input placeholder="Enter your education" />
          </Form.Item>

          <Form.Item
            label="Skills"
            name="skills"
            rules={[{ required: true, message: "Please enter your skills" }]}
          >
            <Input.TextArea placeholder="Enter skills (comma separated)" />
          </Form.Item>

          
          <Form.List name="projects">
            {(fields, { add, remove }) => (
              <>
                <h3 style={{ marginBottom: "10px" }}>Projects</h3>
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    size="small"
                    style={{ marginBottom: "16px", borderRadius: "8px" }}
                    title={`Project ${name + 1}`}
                    extra={
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        style={{ color: "red" }}
                      />
                    }
                  >
                    <Form.Item
                      {...restField}
                      label="Project Title"
                      name={[name, "title"]}
                      rules={[{ required: true, message: "Enter project title" }]}
                    >
                      <Input placeholder="Project Title" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label="Project Description"
                      name={[name, "description"]}
                      rules={[
                        { required: true, message: "Enter project description" },
                      ]}
                    >
                      <Input.TextArea placeholder="Project Description" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label="Live Project Link"
                      name={[name, "workLink"]}
                    >
                      <Input placeholder="Enter live project link" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label="GitHub Repo"
                      name={[name, "github"]}
                    >
                      <Input placeholder="Enter GitHub link" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label="LinkedIn"
                      name={[name, "linkedin"]}
                    >
                      <Input placeholder="Enter LinkedIn link" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label="Portfolio"
                      name={[name, "portfolio"]}
                    >
                      <Input placeholder="Enter Portfolio link" />
                    </Form.Item>
                  </Card>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Project
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

        
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PortfolioForm;
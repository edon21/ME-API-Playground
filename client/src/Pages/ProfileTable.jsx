import React, { useEffect, useState } from "react";
import { Table, Card, Tag, Button, Popconfirm, message } from "antd";
import axios from "axios";

const ProfileTable = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/profile/getProfile"
      );
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleDelete = async (id) => {
    try {
await axios.delete(`http://localhost:5001/api/profile/deleteProfile/${id}`);
      message.success("Profile deleted successfully");
      setProfiles(profiles.filter((profile) => profile._id !== id));
    } catch (error) {
      console.error("Error deleting profile:", error);
      message.error("Failed to delete profile");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Education",
      dataIndex: "education",
      key: "education",
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
      render: (skills) =>
        skills
          ? skills.split(",").map((skill, index) => (
              <Tag color="blue" key={index}>
                {skill.trim()}
              </Tag>
            ))
          : "-",
    },
    {
      title: "Projects",
      dataIndex: "projects",
      key: "projects",
      render: (projects) =>
        projects && projects.length > 0 ? (
          <ul style={{ paddingLeft: "20px" }}>
            {projects.map((p, index) => (
              <li key={index}>
                <b>{p.title}</b> – {p.description} <br />
                🔗 {p.workLink || "No link"} | {p.github || "No GitHub"}
              </li>
            ))}
          </ul>
        ) : (
          "No Projects"
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this profile?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

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
        title="Profiles Table"
        bordered={false}
        style={{
          width: "95%",
          maxWidth: "1200px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "12px",
        }}
      >
        <Table
          dataSource={profiles}
          columns={columns}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default ProfileTable;
import { Button, Card, FileInput, TextInput } from "@mantine/core";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "../FormDetails/formdetails.css";
import axios from "axios";
const FormDetails = ({ editData, setEditData, onClose, reportDetails }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const save = async (data) => {
    const formdata = new FormData();
    formdata.append("file", data.file[0]);

    Object.keys(data).forEach((key) => {
      formdata.append(key, data[key]);
    });
    if (editData?.id) {
      const response = await axios.post(
        "http://localhost:5055/form/edit",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response === "edited") {
        alert("Form Details edited.");
        setEditData(null);
        onClose();
      } else if (response.error) {
        alert(response.error);
      }
    } else {
      const formData = new FormData();
      formData.append("file", data.file[0]);

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      const response = await axios.post(
        "http://localhost:5055/form/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("backenddata", response);

      if (response.data === "added") {
        alert("Form Details added.");
      } else if (response.error) {
        alert(response.error);
      }
    }
  };
  console.log("editdata", editData);

  useEffect(() => {
    if (editData?.id) {
      setValue("firstName", editData.firstName);
      setValue("lastName", editData.lastName);
      setValue("city", editData.city);
      setValue("mobile", editData.mobile);
      setValue("id", editData.id);
    }
  }, [editData]);
  return (
    <div className="main_div">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <form onSubmit={handleSubmit(save)}>
          <TextInput
            label="Input label"
            description="First Name"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span style={{ color: "red" }}>This field is required</span>
          )}

          <TextInput
            label="Input label"
            description="Last Name"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span style={{ color: "red" }}>This field is required</span>
          )}

          <TextInput
            label="Input label"
            description="Mobile"
            {...register("mobile", { required: true })}
          />
          {errors.mobile && (
            <span style={{ color: "red" }}>This field is required</span>
          )}

          <TextInput
            label="Input label"
            description="City"
            {...register("city", { required: true })}
          />
          {errors.city && (
            <span style={{ color: "red" }}>This field is required</span>
          )}

          <input
            label="Input label"
            type="file"
            description="Input description"
            placeholder="Input placeholder"
            {...register("file")}
          />

          {/* <FileInput
            label="Input label"
            description="Input description"
            placeholder="Input placeholder"
            onChange={(e) => {
              setValue("file", e.target.File);
            }}
          /> */}
          {errors.file && (
            <span style={{ color: "red" }}>This field is required</span>
          )}

          {/* <input type="submit" /> */}
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  );
};

export default FormDetails;

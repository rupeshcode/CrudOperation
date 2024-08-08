import { Button, Card, Modal, Select, Table, TextInput } from "@mantine/core";
import { Group, Pagination } from "@mantine/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaDownload, FaEdit } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { toast } from "react-toastify";
import FormDetails from "../FormDetails";
import { useDisclosure } from "@mantine/hooks";
import "../ReportData/report.css";
const ReportData = () => {
  const [reportData, setReportData] = useState();
  const [refresh, setRefresh] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [editData, setEditData] = useState();
  const [isAddMode, setIsAddMode] = useState(false);
  const [search, setSearch] = useState("");
  const [activePage, setPage] = useState(1);
  const [totalElement, setTotalElement] = useState();
  const [totalPages, setTotalPages] = useState();
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    reportDetails();
  }, [refresh, activePage, pageSize, search]);

  const reportDetails = async (id) => {
    console.log("pagesize", pageSize);
    const response = await axios.post(
      "http://localhost:5055/form/get-all-data",
      {
        search,
        pagination: {
          page: activePage - 1,
          size: pageSize,
        },
      }
    );
    console.log("res", response);
    setReportData(response.data.content);
    setTotalElement(response.data.totalElements);
    setTotalPages(response.data.totalPages);
  };

  const deleteReportData = async (id) => {
    setRefresh(true);
    const response = await axios.post("http://localhost:5055/form/delete", {
      id,
    });

    if (response.data === "deleted") {
      setRefresh(false);
      System.out.println("bodyyyyy" + body.getFirstName());
      System.out.println("bodyyyyy" + body.getLastName());
      System.out.println("bodyyyyy" + body.getMobile());
      System.out.println("bodyyyyy" + body.getCity());
      System.out.println("bodyyyyy" + body.getId());

      System.out.println("bodyyyyy" + file);
      toast.success("deleted succesfully");
    }
    console.log("res", response);
  };

  const handleAddClick = () => {
    setIsAddMode(true);
    setEditData({});
    open();
  };

  const handleEditClick = (item) => {
    setEditData(item);
    setIsAddMode(false);
    open();
  };

  const handleDownloadpdf = async () => {
    const response = await axios.post("http://localhost:5055/files/");
  };
  console.log("editdataaaa", editData);

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <div className="d-flex justify-content-center">
          {/* <Button onClick={handleAddClick}>Add Details</Button> */}
          <TextInput
            placeholder="Search Filter"
            // value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            style={{ width: "30%" }}
          />
          {/* <Button onClick={handleSearch}>Search</Button> */}
        </div>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Id</Table.Th>
              <Table.Th>First Name</Table.Th>
              <Table.Th>Last Name</Table.Th>
              <Table.Th>City</Table.Th>
              <Table.Th>Mobile</Table.Th>
              <Table.Th>File</Table.Th>

              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {reportData?.length > 0 &&
              reportData.map((item, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{item.id}</Table.Td>
                  <Table.Td>{item.firstName}</Table.Td>
                  <Table.Td>{item.lastName}</Table.Td>
                  <Table.Td>{item.city}</Table.Td>
                  <Table.Td>{item.mobile}</Table.Td>

                  <Table.Td>{item.filePath}</Table.Td>
                  <Table.Td>
                    {
                      <FaEdit
                        style={{ marginRight: "7px" }}
                        onClick={() => handleEditClick(item)}
                      />
                    }
                    {
                      <ImBin
                        onClick={() => {
                          deleteReportData(item.id);
                        }}
                      />
                    }
                    {
                      <FaDownload
                        onClick={() => {
                          window.open(
                            `${"http://localhost:5055/"}files/docs?path=${
                              item?.filePath
                            }`,
                            "_blank"
                          );
                        }}
                      />
                    }
                  </Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>

        <div style={{ marginRight: "20px", marginTop: "22px" }}>
          <h6>Total:{totalElement}</h6>
        </div>
        <div className="pagesize_wrapper">
          <div>
            <Select
              style={{ width: "70px" }}
              data={["10", "20", "30", "40"]}
              value={pageSize}
              allowDeselect={false}
              defaultValue="10"
              onChange={(value) => {
                setPageSize(value);
                setPage(1);
              }}
              label="page size"
              placeholder="Pick value"
            />
          </div>
          <div>
            <Pagination.Root
              total={totalPages}
              onChange={(value) => {
                console.log("va", value);
                setPage(value);
              }}
              value={activePage}
            >
              <Group gap={5} justify="center">
                <Pagination.First />
                <Pagination.Previous />
                <Pagination.Items />
                <Pagination.Next />
                <Pagination.Last />
              </Group>
            </Pagination.Root>
          </div>
        </div>
      </Card>
      <Modal
        opened={opened}
        onClose={close}
        title={isAddMode ? "Add Form Data" : "Edit Form Data"}
      >
        <FormDetails
          editData={editData}
          setEditData={setEditData}
          onClose={close}
          reportDetails={reportDetails}
        />
      </Modal>
    </>
  );
};

export default ReportData;

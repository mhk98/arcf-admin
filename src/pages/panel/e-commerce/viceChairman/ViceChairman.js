import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, UncontrolledDropdown } from "reactstrap";
import SimpleBar from "simplebar-react";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Col,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  Icon,
  PaginationComponent,
  PreviewAltCard,
  Row,
} from "../../../../components/Component";

import toast from "react-hot-toast";

import {
  useCreateViceChairmanMutation,
  useDeleteViceChairmanMutation,
  useGetAllViceChairmanQuery,
  useUpdateViceChairmanMutation,
} from "../../../../features/viceChairman/viceChairman";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";

const ViceChairman = () => {
  // const [data, setData] = useState([]);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [sm, updateSm] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [editData, setEditData] = useState({});
  const { data, isLoading, error } = useGetAllViceChairmanQuery();
  const [createViceChairman] = useCreateViceChairmanMutation();

  const [updateId, setUpdateId] = useState("");

  const customStyles = {
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    input: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
  };

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    text: "",
    image: "",
  });
  const [editId, setEditedId] = useState();
  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false,
  });
  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);
  const [files, setFiles] = useState([]);

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  }

  // function to close the form modal
  const onFormCancel = () => {
    setView({ edit: false, add: false, details: false });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      name: "",
      text: "",
    });
    setImage("");
    setTitle("");
    setName("");
    setText("");
    reset({});
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,

    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onFormSubmit = async (data) => {
    console.log("form", data.title);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("name", data.name);
    formData.append("text", data.text);
    formData.append("image", image);

    console.log("formData", formData);
    try {
      const res = await createViceChairman(formData);
      if (res) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setFiles([]);
    resetForm();
  };

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    reset: reset1,

    formState: { errors: errors1 },
  } = useForm();

  // const onEditSubmit = async (data) => {
  //   const formData = new FormData();
  //   formData.append("Name", data.Name);
  //   formData.append("Stock", data.Stock);
  //   formData.append("Image", image);

  //   console.log("formData", formData);
  //   try {
  //     const data = await axios.put(`http://localhost:5000/api/v1/category/${updateId}`, formData);

  //     if (data) {
  //       toast.success(data.data.message);
  //     }
  //   } catch (error) {
  //     console.log("Error", error);
  //   }

  //   resetForm();
  // };

  const [updateViceChairman] = useUpdateViceChairmanMutation(); // Use the generated update hook

  // Function to update a category
  const onEditSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("name", name);
    formData.append("text", text);
    formData.append("image", image);
    try {
      const response = await updateViceChairman({ id: updateId, data: formData });

      if (response) {
        toast.success(response.data.message);
        onFormCancel();
      }
    } catch (error) {
      toast.error(error.message);
    }
    setFiles([]);
    resetForm();
  };

  const [deleteViceChairman] = useDeleteViceChairmanMutation();

  // Function to delete a category
  const handleDeleteSlider = async (id) => {
    try {
      const res = await deleteViceChairman(id);
      if (res) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    reset(formData);
    reset1(formData);
  }, [formData]);

  // selects all the products
  // const selectorCheck = (e) => {
  //   let newData;
  //   newData = data.map((item) => {
  //     item.check = e.currentTarget.checked;
  //     return item;
  //   });
  //   setData([...newData]);
  // };

  // selects one product
  // const onSelectChange = (e, id) => {
  //   let newData = data;
  //   let index = newData.findIndex((item) => item.id === id);
  //   newData[index].check = e.currentTarget.checked;
  //   setData([...newData]);
  // };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // toggle function to view product details
  const toggle = (type) => {
    setView({
      edit: type === "edit" ? true : false,
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  const slider = data?.data || "";

  console.log("data", slider);
  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;

  const currentItems = slider.slice(indexOfFirstItem, indexOfLastItem);

  // console.log("currentItems", currentItems);
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <Head title="Products"></Head>
      <Content>
        {/* Header Part Start */}
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Image</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <a
                  href="#more"
                  className="btn btn-icon btn-trigger toggle-expand me-n1"
                  onClick={(ev) => {
                    ev.preventDefault();
                    updateSm(!sm);
                  }}
                >
                  <Icon name="more-v"></Icon>
                </a>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search"></Icon>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="default-04"
                          placeholder="Quick search by SKU"
                          onChange={(e) => onFilterChange(e)}
                        />
                      </div>
                    </li>
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          color="transparent"
                          className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                        >
                          Status
                        </DropdownToggle>
                        <DropdownMenu end>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>New Items</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Featured</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Out of Stock</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                        <span>Add ViceChairman Info</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        {/* Header Part End */}

        {error ? <>Oh, no there was an error</> : isLoading ? <>Loading...</> : currentItems ? <></> : null}

        <Block>
          <div className="nk-tb-list is-separate is-medium mb-3">
            <DataTableHead className="nk-tb-item">
              {/* <DataTableRow className="nk-tb-col-check">
                <div className="custom-control custom-control-sm custom-checkbox notext">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="uid_1"
                    onChange={(e) => selectorCheck(e)}
                  />
                  <label className="custom-control-label" htmlFor="uid_1"></label>
                </div>
              </DataTableRow> */}
              <DataTableRow size="sm">
                <span>Name</span>
              </DataTableRow>

              <DataTableRow size="sm">
                <span>Title</span>
              </DataTableRow>

              <DataTableRow size="sm">
                <span>Description</span>
              </DataTableRow>

              <DataTableRow>
                <span>Create Date</span>
              </DataTableRow>

              <DataTableRow size="md">
                <span>Created By</span>
              </DataTableRow>

              <DataTableRow className="nk-tb-col-tools">
                <ul className="nk-tb-actions gx-1 my-n1">
                  <li className="me-n1">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        tag="a"
                        href="#toggle"
                        onClick={(ev) => ev.preventDefault()}
                        className="dropdown-toggle btn btn-icon btn-trigger"
                      >
                        <Icon name="more-h"></Icon>
                      </DropdownToggle>
                    </UncontrolledDropdown>
                  </li>
                </ul>
              </DataTableRow>
            </DataTableHead>
            {currentItems.length > 0
              ? currentItems.map((item) => (
                  <DataTableItem key={item.Category_Id}>
                    {/* <DataTableRow className="nk-tb-col-check">
                      <div className="custom-control custom-control-sm custom-checkbox notext">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          defaultChecked={item.Check}
                          id={item.id + "uid1"}
                          key={Math.random()}
                          onChange={(e) => onSelectChange(e, item.Category_Id)}
                        />
                        <label className="custom-control-label" htmlFor={item.id + "uid1"}></label>
                      </div>
                    </DataTableRow> */}
                    <DataTableRow size="sm">
                      <span className="tb-product">
                        <img src={`http://localhost:5000/${item.image}`} alt="product" className="thumb" />
                      </span>
                    </DataTableRow>

                    <DataTableRow>
                      <span className="tb-sub">{item.title}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-sub">{item.text}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-sub">$ {item.createdAt}</span>
                    </DataTableRow>

                    <DataTableRow>
                      <span className="tb-sub">Admin</span>
                    </DataTableRow>
                    {/* <DataTableRow size="md">
                      <span className="tb-sub">{categoryList.join(", ")}</span>
                    </DataTableRow> */}

                    <DataTableRow className="nk-tb-col-tools">
                      <ul className="nk-tb-actions gx-1 my-n1">
                        <li className="me-n1">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              tag="a"
                              href="#more"
                              onClick={(ev) => ev.preventDefault()}
                              className="dropdown-toggle btn btn-icon btn-trigger"
                            >
                              <Icon name="more-h"></Icon>
                            </DropdownToggle>
                            <DropdownMenu end>
                              <ul className="link-list-opt no-bdr">
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    href="#edit"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      setUpdateId(item.Id);
                                      setEditData({
                                        title: item.title,
                                        text: item.text,
                                        name: item.name,
                                        image: item.image,
                                      });
                                      toggle("edit");
                                    }}
                                  >
                                    <Icon name="edit"></Icon>
                                    <span>Edit</span>
                                  </DropdownItem>
                                </li>
                                {/* <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#view"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        onEditClick(item.id);
                                        toggle("details");
                                      }}
                                    >
                                      <Icon name="eye"></Icon>
                                      <span>View Product</span>
                                    </DropdownItem>
                                  </li> */}
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    href="#remove"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      handleDeleteSlider(item.Id);
                                    }}
                                  >
                                    <Icon name="trash"></Icon>
                                    <span>Remove </span>
                                  </DropdownItem>
                                </li>
                              </ul>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </li>
                      </ul>
                    </DataTableRow>
                  </DataTableItem>
                ))
              : null}
          </div>

          <PreviewAltCard>
            {slider.length > 0 ? (
              <PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={slider.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">No Info found</span>
              </div>
            )}
          </PreviewAltCard>
        </Block>

        <Modal isOpen={view.edit} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Update Info</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit1(onEditSubmit)}>
                  <Row className="g-3">
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Title
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            name="title"
                            defaultValue={editData.title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ width: "100%", padding: "10px" }}
                          />
                          {errors.title && <span className="invalid">{errors.title.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            name="name"
                            defaultValue={editData.name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: "100%", padding: "10px" }}
                          />
                          {errors.name && <span className="invalid">{errors.name.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Description
                        </label>
                        <div className="form-control-wrap">
                          <textarea
                            type="text"
                            name="text"
                            defaultValue={editData.text}
                            onChange={(e) => setText(e.target.value)}
                            style={{ width: "100%", padding: "10px", height: "120px" }}
                          />
                          {errors.text && <span className="invalid">{errors.text.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col size="6">
                      <div className="form-group">
                        <p className="form-label" htmlFor="category">
                          Image
                        </p>
                        <div className="form-control-wrap">
                          <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange} />
                          {file ? (
                            <img src={file} alt="" />
                          ) : (
                            <img src={`http://localhost:5000/${editData.image}`} alt="" />
                          )}
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>Save Change</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <SimpleBar
          className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${
            view.add ? "content-active" : ""
          }`}
        >
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Add Info</BlockTitle>
              <BlockDes>
                <p>Add information or update info.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-3">
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Title
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="title"
                        {...register("title", {
                          required: "this field is required.",
                        })}
                        style={{ width: "100%", padding: "10px" }}
                      />
                      {errors.title && <span className="invalid">{errors.title.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Name
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="name"
                        {...register("name", {
                          required: "this field is required.",
                        })}
                        style={{ width: "100%", padding: "10px" }}
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Description
                    </label>
                    <div className="form-control-wrap">
                      <textarea
                        type="text"
                        name="text"
                        {...register("text", {})}
                        style={{ width: "100%", padding: "10px", height: "120px" }}
                      />
                      {errors.text && <span className="invalid">{errors.text.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col size="6">
                  <div className="form-group">
                    <p className="form-label" htmlFor="category">
                      Image
                    </p>
                    <div className="form-control-wrap">
                      <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange} />
                      <img src={file} alt="" />
                    </div>
                  </div>
                </Col>

                <Col size="12">
                  <Button color="primary" type="submit">
                    <Icon className="plus"></Icon>
                    <span>Add Vice Chairman</span>
                  </Button>
                </Col>
              </Row>
            </form>
          </Block>
        </SimpleBar>

        {view.add && <div className="toggle-overlay" onClick={toggle}></div>}
      </Content>
    </React.Fragment>
  );
};

export default ViceChairman;

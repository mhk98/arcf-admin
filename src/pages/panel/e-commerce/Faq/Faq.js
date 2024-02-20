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
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useGetAllFaqQuery,
  useUpdateFaqMutation,
} from "../../../../features/Faq/Faq";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";

// import { productData } from "../product/ProductData";

const Faq = () => {
  const [sm, updateSm] = useState(false);

  const { data, isLoading, error } = useGetAllFaqQuery();
  const [createFaq] = useCreateFaqMutation();

  const [updateId, setUpdateId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editData, setEditData] = useState({});

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
    question: "",
    answer: "",
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
  // function to close the form modal
  const onFormCancel = () => {
    setView({ edit: false, add: false, details: false });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      question: "",
      answer: "",
    });
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

  const onFormSubmit = async (form) => {
    const data = {
      question: form.question,
      answer: form.answer,
    };

    try {
      const res = await createFaq(data);
      if (res) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

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

  const [updateFaq] = useUpdateFaqMutation(); // Use the generated update hook

  // Function to update a category
  const onEditSubmit = async () => {
    const data = {
      question: question,
      answer: answer,
    };

    try {
      const response = await updateFaq({ id: updateId, data });

      if (response) {
        toast.success(response.data.message);
        onFormCancel();
      }
    } catch (error) {
      toast.error(error.message);
    }

    resetForm();
  };

  const [deleteFaq] = useDeleteFaqMutation();

  // Function to delete a category
  const handleDeleteFaq = async (id) => {
    try {
      const res = await deleteFaq(id);
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

  const faq = data?.data || "";

  console.log("data", faq);
  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;

  const currentItems = faq.slice(indexOfFirstItem, indexOfLastItem);

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
              <BlockTitle>Faq</BlockTitle>
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
                        <span>Add faq</span>
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
                <span>Question</span>
              </DataTableRow>

              <DataTableRow size="sm">
                <span>Answer</span>
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

                    <DataTableRow>
                      <span className="tb-sub">{item.question}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-sub">{item.answer}</span>
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
                                        question: item.question,
                                        answer: item.answer,
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
                                      handleDeleteFaq(item.Id);
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
            {faq.length > 0 ? (
              <PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={faq.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">No faq found</span>
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
              <h5 className="title">Update Faq</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit1(onEditSubmit)}>
                  <Row className="g-3">
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Faq Question
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            name="question"
                            defaultValue={editData.question}
                            onChange={(e) => setQuestion(e.target.value)}
                            style={{ width: "100%", padding: "10px" }}
                          />
                          {errors1.question && <span className="invalid">{errors1.question.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Answer
                        </label>
                        <div className="form-control-wrap">
                          <textarea
                            type="text"
                            name="answer"
                            defaultValue={editData.answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            style={{ width: "100%", padding: "10px" }}
                          />
                          {errors1.answer && <span className="invalid">{errors1.answer.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>Update Faq</span>
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
              <BlockTitle tag="h5">Add Faq</BlockTitle>
              <BlockDes>
                <p>Add information or update Faq.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-3">
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Faq Question
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="question"
                        {...register("question", {
                          required: "this field is required.",
                        })}
                        style={{ width: "100%", padding: "10px" }}
                      />
                      {errors.question && <span className="invalid">{errors.question.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Answer
                    </label>
                    <div className="form-control-wrap">
                      <textarea
                        type="text"
                        name="answer"
                        {...register("answer", {
                          required: "this field is required.",
                        })}
                        style={{ width: "100%", padding: "10px" }}
                      />
                      {errors.answer && <span className="invalid">{errors.answer.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col size="12">
                  <Button color="primary" type="submit">
                    <Icon className="plus"></Icon>
                    <span>Add Faq</span>
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

export default Faq;

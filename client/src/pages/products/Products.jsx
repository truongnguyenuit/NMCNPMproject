import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import setAuthToken from "../../untils/setAuthToken";
import ProductsNavbar from "./products_action/ProductsAction";
import { useReactToPrint } from "react-to-print";
import { styled } from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import UpdateProduct from "../products/updateProduct/UpdateProduct";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Dialog from "../../components/dialog/Dialog";
import { toast } from "react-toastify";
import { ENDPOINT } from "../../App";
import { BsSearch } from "react-icons/bs";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const columns = [
  { id: "_id", label: "Mã sản phẩm" },
  { id: "name", label: "Tên sản phẩm" },
  {
    id: "originPrice",
    label: "Giá vốn (vnđ)",

    format: (value) => `${value.toLocaleString("en-US")}`,
  },
  {
    id: "salePrice",
    label: "Giá bán (vnđ)",

    format: (value) => `${value.toLocaleString("en-US")}`,
  },
];

const Products = () => {
  const componentRef = useRef();
  const [products, setProducts] = useState([]);
  const [showDialogDelete, setShowDialogDelete] = useState(false);
  const [originProducts, setOriginProducts] = useState([]);
  const [rerenderProducts, setRerenderProducts] = useState(false);
  const [page, setPage] = React.useState(0);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [searchText, setSearchText] = useState("");
  const [showFormUpdateProduct, setShowFormUpdateProduct] = useState(false);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleCloseDialog = () => {
    setShowDialogDelete(false);
  };

  //get product from API
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setAuthToken(accessToken);
    axios
      .get(`${ENDPOINT}/product/products`)
      .then((res) => {
        setProducts(res.data.products);
        console.log(res.data.products)
        setOriginProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err.res);
      });
  }, [ rerenderProducts,showFormUpdateProduct,selectedProduct]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteProduct = () => {
    axios
      .delete(`${ENDPOINT}/product/${selectedProduct._id}`)
      .then((res) => {
        handleCloseDialog();
        toast("Xoá sản phẩm thành công");
        setSelectedProduct(null);
      })
      .catch("Lỗi, xin hãy thử lại sau");
  };

  //search product
  useEffect(() => {
    if (!searchText || !products) {
    }
    const productFilter = originProducts.filter((product) => {
      return (
        product.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        product._id.indexOf(searchText) > -1
      );
    });
    setProducts(productFilter);
  }, [searchText]);
  
  return (
    <div className="main products">
      <Dialog
        title="Xoá sản phẩm"
        content={`Bạn có muốn xoá sản phẩm: ${selectedProduct?.name} `}
        open={showDialogDelete}
        handleCancel={handleCloseDialog}
        handleAction={handleDeleteProduct}
      />
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={showFormUpdateProduct}
        onClose={() => {
          setShowFormUpdateProduct(false);
        }}
        BackdropComponent={Backdrop}
      >
        <UpdateProduct
          product={selectedProduct}
          setShowFormUpdateProduct={setShowFormUpdateProduct}
          setProduct={setSelectedProduct}
        />
      </StyledModal>

      <div className="search_name">
        <div className="search_name-wrapper">
          <input
            className="search_name-input"
            id="search_name-input"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            placeholder="Nhập mã hoặc tên sản phẩm"
          />
           <label htmlFor="search_name-input" className="search_name-icon">
            <BsSearch />
          </label>
        </div>
      </div>

      <div className="main_list">
        <div className="list_left">
          <ProductsNavbar
            handlePrint={handlePrint}
            setRerenderProducts={setRerenderProducts}
          />
        </div>
        <div className="list_right">
          <div>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table
                  ref={componentRef}
                  stickyHeader
                  aria-label="sticky table"
                  style={{
                    boxShadow: "0 2px 15px rgb(0 0 0 / 25%) !important",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            backgroundImage:
                              "-webkit-linear-gradient(90deg, #fd501b, #ff861a)",
                            color: "#fff",
                            fontSize: "17px",
                            fontWeight: "bold",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                      <TableCell
                        style={{
                          backgroundImage:
                            "-webkit-linear-gradient(90deg, #fd501b, #ff861a)",
                        }}
                      ></TableCell>
                      <TableCell
                        style={{
                          backgroundImage:
                            "-webkit-linear-gradient(90deg, #fd501b, #ff861a)",
                        }}
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            key={index}
                            style={
                              index % 2 == 1
                                ? { backgroundColor: "#ff861a24" }
                                : {}
                            }
                          >
                            {columns.map((column) => {
                              let value = row[column.id];
                              if (column.id === "_id") {
                                value = value?.substr(value.length - 7);
                              }

                              return (
                                <TableCell
                                  key={column.id}
                                  style={{ fontSize: "16px" }}
                                >
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                            <TableCell
                              onClick={() => {
                                console.log("update");
                                setSelectedProduct(row);

                                setShowFormUpdateProduct(true);
                              }}
                            >
                              <AiFillEdit
                              style={{
                                fontSize: 18,
                                color: "#005059",
                                cursor: "pointer",
                              }}
                              className="hide-on-print"
                            />
                            </TableCell>
                            <TableCell
                              onClick={() => {
                                console.log("delete");
                                setSelectedProduct(row);
                                setShowDialogDelete(true);
                              }}
                            >
                              <AiFillDelete
                              style={{
                                fontSize: 18,
                                color: "#fd501b",
                                cursor: "pointer",
                              }}
                              className="hide-on-print"
                            />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[6]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Số hàng hiển thị"
              />
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

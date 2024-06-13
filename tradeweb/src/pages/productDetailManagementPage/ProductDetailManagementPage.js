import React from 'react';
import styled from "styled-components";
import ReactQuill from "react-quill";
import "quill/dist/quill.core.css";
import DropdownOptions from "../../components/common/DropdownOptions";
import plusIcon from "../../assets/plus.svg";
import ProductModify from '../../components/product/ProductModify';

const ProductDetailManagementPage = () => {

    return (
        <div>
            <ProductModify/>
        </div>
    );
};

export default ProductDetailManagementPage;
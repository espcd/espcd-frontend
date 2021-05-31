import React, {Component} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

class ProductSelectComponent extends Component {
    render() {
        let products = this.props.products;
        let productId = this.props.product_id;
        let value = products.find(product => product.id === productId) ? productId : "";

        return (
            <FormControl
                fullWidth
                margin="dense"
            >
                <InputLabel id="product-select-label">Product</InputLabel>
                <Select
                    labelId="product-select-label"
                    id="product_id"
                    name="product_id"
                    value={value}
                    onChange={this.props.onChange}
                >
                    <MenuItem value={""} key={`product-menuitem-`}>-</MenuItem>
                    {products.map(product => (
                        <MenuItem
                            value={product.id}
                            key={`product-menuitem-${product.id}`}
                        >
                            {product.title ? product.title : product.id} ({product.fqbn})
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}

export default ProductSelectComponent;

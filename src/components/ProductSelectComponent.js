import React, {Component} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

class ProductSelectComponent extends Component {
    render() {
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
                    value={this.props.product_id}
                    onChange={this.props.onChange}
                >
                    <MenuItem value={""} key={`product-menuitem-`}>-</MenuItem>
                    {this.props.products.map(product => (
                        <MenuItem
                            value={product.id}
                            key={`product-menuitem-${product.id}`}
                        >
                            {product.title ? product.title : product.id} ({product.model})
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}

export default ProductSelectComponent;

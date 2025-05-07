package com.app.giticon_pr.controller;

import com.app.giticon_pr.mapper.CartMapper;
import com.app.giticon_pr.model.Cart;
import com.app.giticon_pr.model.Gifticon;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartMapper cartMapper;

    public CartController(CartMapper cartMapper) {
        this.cartMapper = cartMapper;
    }

    @GetMapping("/{userId}")
    public List<Gifticon> getCart(@PathVariable("userId") Long userId) {
        return cartMapper.findAllByUserId(userId);
    }

    @PostMapping
    public void addToCart(@RequestBody Cart cart) {
        cartMapper.insert(cart);
    }

    @DeleteMapping("/{id}")
    public void removeFromCart(@PathVariable("id") Long id) {
        cartMapper.deleteById(id);
    }

    @DeleteMapping("/clear/{userId}")
    public void clearCart(@PathVariable("userId") Long userId) {
        cartMapper.deleteAllByUserId(userId);
    }
}

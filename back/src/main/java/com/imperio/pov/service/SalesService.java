package com.imperio.pov.service;

import com.imperio.pov.controller.dto.SaleDto;
import com.imperio.pov.controller.exception.StockException;
import com.imperio.pov.model.CashDesk;
import com.imperio.pov.model.ItemSale;
import com.imperio.pov.model.Product;
import com.imperio.pov.model.Sale;
import com.imperio.pov.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SalesService {

    private final SalesRepository repository;
    private final CashDeskService cashDeskService;
    private final ProductService productService;

    @Autowired
    public SalesService(SalesRepository repository, CashDeskService cashDeskService, ProductService productService) {
        this.repository = repository;
        this.cashDeskService = cashDeskService;
        this.productService = productService;
    }

    public List<SaleDto> listSalesByCashDesk(CashDesk cashDesk) {
        return repository.getAllByCashDesk(cashDesk).stream().map(Sale::mapperToDto).collect(Collectors.toList());
    }

    public SaleDto register(SaleDto saleDto, Long cashDeskId) {
        CashDesk cashDesk = cashDeskService.findCashDesk(cashDeskId).mapperToModel();
        Sale sale = saleDto.mapperToModel(cashDesk);

        List<Product> products = new ArrayList<>();
        for (ItemSale item: sale.getItems()) {
            int quantitySale = item.getQuantity();

            try {
                item.getProduct().stockOut(quantitySale);
                products.add(item.getProduct());
            } catch (IllegalArgumentException e) {
                throw new StockException(e.getMessage());
            }
        }

        productService.updateAll(products);

        return repository.save(sale).mapperToDto();
    }
}

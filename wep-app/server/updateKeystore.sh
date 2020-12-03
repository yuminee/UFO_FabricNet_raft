#!/bin/bash

echo 'printing keystore for Sales'

SALES_KEYSTORE=$(ls ../../ufo-network/crypto-config/peerOrganizations/sales.ufo.com/users/Admin\@sales.ufo.com/msp/keystore/)
CUSTOMER_KEYSTORE=$(ls ../../ufo-network/crypto-config/peerOrganizations/customer.ufo.com/users/Admin\@customer.ufo.com/msp/keystore/)

SALES_PATH_TO_KEYSTORE="Admin@sales.ufo.com/msp/keystore/"
CUSTOMER_PATH_TO_KEYSTORE="Admin@customer.ufo.com/msp/keystore/"

UPDATED_KEYSTORE_SALES="$SALES_PATH_TO_KEYSTORE$SALES_KEYSTORE"
UPDATED_KEYSTORE_CUSTOMER="$CUSSTOMER_PATH_TO_KEYSTORE$CUSTOMER_KEYSTORE"

echo $UPDATED_KEYSTORE_SALES

# sed -i "s|keystore/.*|${UPDATED_KEYSTORE}|g" connection.yaml
# .* is regex-ese for "any character followed by zero or more of any character(s)"

echo 'updating connection.yaml Sales adminPrivateKey path with' ${UPDATED_KEYSTORE_SALES}

sed -i -e "s|Admin@sales.ufo.com/msp/keystore/.*|$UPDATED_KEYSTORE_SALES|g" connection.yaml

echo 'updating connection.yaml Customer adminPrivateKey path with' ${UPDATED_KEYSTORE_CUSTOMER}

sed -i -e "s|Admin@customer.ufo.com/msp/keystore/.*|$UPDATED_KEYSTORE_CUSTOMER|g" connection.yaml

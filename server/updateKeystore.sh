#!/bin/bash

echo 'printing keystore for Sales'

ORG_1_KEYSTORE=$(ls ../ufo-network/crypto-config/peerOrganizations/sales.ufo.com/users/Admin\@sales.ufo.com/msp/keystore/)
ORG_2_KEYSTORE=$(ls ../ufo-network/crypto-config/peerOrganizations/customer.ufo.com/users/Admin\@customer.ufo.com/msp/keystore/)

ORG_1_PATH_TO_KEYSTORE="Admin@sales.ufo.com/msp/keystore/"
ORG_2_PATH_TO_KEYSTORE="Admin@customer.ufo.com/msp/keystore/"

UPDATED_KEYSTORE_ORG_1="$ORG_1_PATH_TO_KEYSTORE$ORG_1_KEYSTORE"
UPDATED_KEYSTORE_ORG_2="$ORG_2_PATH_TO_KEYSTORE$ORG_2_KEYSTORE"

echo $UPDATED_KEYSTORE_ORG_1

# sed -i "s|keystore/.*|${UPDATED_KEYSTORE}|g" connection.yaml
# .* is regex-ese for "any character followed by zero or more of any character(s)"

echo 'updating connection.yaml Sales adminPrivateKey path with' ${UPDATED_KEYSTORE_ORG_1}

sed -i -e "s|Admin@sales.ufo.com/msp/keystore/.*|$UPDATED_KEYSTORE_ORG_1|g" connection.yaml

echo 'updating connection.yaml Customer adminPrivateKey path with' ${UPDATED_KEYSTORE_ORG_2}

sed -i -e "s|Admin@customer.ufo.com/msp/keystore/.*|$UPDATED_KEYSTORE_ORG_2|g" connection.yaml

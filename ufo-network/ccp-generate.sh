#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $6)
    local CP=$(one_line_pem $7)
    sed -e "s/\${SORG}/$1/" \
        -e "s/\${LORG}/$2/" \
        -e "s/\${P0PORT}/$3/" \
        -e "s/\${P1PORT}/$4/" \
        -e "s/\${CAPORT}/$5/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ccp-template.json 
}

function yaml_ccp {
    local PP=$(one_line_pem $6)
    local CP=$(one_line_pem $7)
    sed -e "s/\${SORG}/$1/" \
        -e "s/\${LORG}/$2/" \
        -e "s/\${P0PORT}/$3/" \
        -e "s/\${P1PORT}/$4/" \
        -e "s/\${CAPORT}/$5/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ccp-template.yaml | sed -e $'s/\\\\n/\\\n        /g'
}


SORG=sales
LORG=Sales
P0PORT=7051
P1PORT=8051
CAPORT=7054
PEERPEM=crypto-config/peerOrganizations/sales.ufo.com/tlsca/tlsca.sales.ufo.com-cert.pem
CAPEM=crypto-config/peerOrganizations/sales.ufo.com/ca/ca.sales.ufo.com-cert.pem

echo "$(json_ccp $SORG $LORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-sales.json
echo "$(yaml_ccp $SORG $LORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-sales.yaml


SORG=customer
LORG=Customer
P0PORT=9051
P1PORT=10051
CAPORT=8054
PEERPEM=crypto-config/peerOrganizations/customer.ufo.com/tlsca/tlsca.customer.ufo.com-cert.pem
CAPEM=crypto-config/peerOrganizations/customer.ufo.com/ca/ca.customer.ufo.com-cert.pem

echo "$(json_ccp $SORG $LORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-customer.json
echo "$(yaml_ccp $SORG $LORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-customer.yaml

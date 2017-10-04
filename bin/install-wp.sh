#!/usr/bin/env bash

set -ex;

WP_CLI=$(cd $(dirname $0);cd ../;pwd)/vendor/bin/wp

DB_NAME=$1
DB_USER=${2-root}
DB_PASS=$3
PORT=8080
WP_PATH=$(pwd)/www
WP_TITLE='Welcome to the WordPress'
WP_DESC='Hello World!'

if [ -e "$WP_PATH/wp-config.php" ]; then
    exit 0
fi

echo "path: www" > $(pwd)/wp-cli.yml

$WP_CLI core download --path=$WP_PATH --locale=en_US --version=trunk --force

if [ $DB_PASS ]; then
$WP_CLI config create \
--skip-check \
--dbhost=localhost \
--dbname="$DB_NAME" \
--dbuser="$DB_USER" \
--dbpass="$DB_PASS" \
--dbprefix=wp_ \
--locale=en_US \
--extra-php <<PHP
define( 'JETPACK_DEV_DEBUG', true );
define( 'WP_DEBUG', true );
PHP
else
$WP_CLI config create \
--skip-check \
--dbhost=localhost \
--dbname=$DB_NAME \
--dbuser=$DB_USER \
--dbprefix=wp_ \
--locale=en_US \
--extra-php <<PHP
define( 'JETPACK_DEV_DEBUG', true );
define( 'WP_DEBUG', true );
PHP
fi

$WP_CLI db create || $WP_CLI db reset --yes

$WP_CLI core install \
--url=http://127.0.0.1:$PORT \
--title="WordPress" \
--admin_user="admin" \
--admin_password="admin" \
--admin_email="admin@example.com"

$WP_CLI rewrite structure "/archives/%post_id%"

$WP_CLI option update blogname "$WP_TITLE"
$WP_CLI option update blogdescription "$WP_DESC"

if [ -e "provision-post.sh" ]; then
    bash provision-post.sh
fi
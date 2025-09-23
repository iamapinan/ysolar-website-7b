-- Migration: Add image_url column to services table
-- Run this script if you have an existing database without the image_url column

-- Check if image_url column exists, if not add it
SET @column_exists = (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'services'
    AND COLUMN_NAME = 'image_url'
);

SET @sql = IF(@column_exists = 0,
  'ALTER TABLE services ADD COLUMN image_url VARCHAR(512) NULL AFTER content',
  'SELECT "Column image_url already exists" as message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

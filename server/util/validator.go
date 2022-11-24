package util

import "fmt"

func ValidateUsername(value string) error {
	const (
		minLength = 3
		maxLength = 12
	)
	err := ValidateStringLength(value, minLength, maxLength)
	if err != nil {
		return err
	}
	return nil
}

func ValidatePassword(value string) error {
	const (
		minLength = 6
		maxLength = 24
	)
	err := ValidateStringLength(value, minLength, maxLength)
	if err != nil {
		return err
	}
	return nil
}

func ValidateStringLength(value string, minLength int, maxLength int) error {
	if len(value) < minLength || len(value) > maxLength {
		return fmt.Errorf("invalid length! Must be between %d and %d characters", minLength, maxLength)
	}
	return nil
}

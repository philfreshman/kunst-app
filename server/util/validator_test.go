package util

import (
	"github.com/stretchr/testify/require"
	"testing"
)

func TestValidators(t *testing.T) {
	username := RandomString(2)
	err := ValidateUsername(username)
	require.Error(t, err)

	password := RandomString(3)
	err = ValidatePassword(password)
	require.Error(t, err)

	value := "xyz"
	err = ValidateStringLength(value, 4, 12)
	require.Error(t, err)
}

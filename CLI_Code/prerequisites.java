package main.src;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import main.utilities.exceptionhelper;
import main.utilities.printResultSet;
import main.utilities.scannerHelper;
import oracle.jdbc.OracleTypes;

public class prerequisites {

    private static String deptCode = "CS";
    private static int courseNum = 536;
    // Handle the prerequisites of a course
    public static void handlePrerequisites(Connection conn) throws SQLException{
        try {
            // Display the courses table
            display.displaySpecificTable("courses",conn);
            scannerHelper.readString();
            System.out.print("\nChoose dept code from above table: ");
            // Get the department code
            deptCode = scannerHelper.readString();
            System.out.print("\nChoose course id from above table: ");
            // Get the course number
            courseNum = scannerHelper.readInt();
            deptCode = deptCode.toUpperCase();
            // Call the method to get the prerequisites
            getPrerequisites(conn);
        } catch (Exception e) {
            e.getMessage();
        }
    }

    public static void getPrerequisites(Connection conn) throws SQLException {
        try {
            // Call the stored procedure to get the prerequisites of a course
            CallableStatement cs = conn.prepareCall("{call student_management_pkg_jdbc.GET_PREREQUISITES(?, ?, ?, ?)}");
            // Set the procedure parameters
            cs.setString(1, deptCode);
            cs.setInt(2, courseNum);
            // Register the out parameters
            cs.registerOutParameter(3, OracleTypes.CURSOR);
            cs.registerOutParameter(4, OracleTypes.CURSOR);

            cs.execute();

            // Get the result sets
            ResultSet directPrerequisites = (ResultSet) cs.getObject(3);
            ResultSet indirectPrerequisites = (ResultSet) cs.getObject(4);
            if (!directPrerequisites.isBeforeFirst()) {
                System.out.println(String.format("%s%d does not exist", deptCode, courseNum));
                return;
            }
            System.out.println("\nDirect Prerequisites: ");
            printResultSet.printObject(directPrerequisites);
            System.out.println("\nIndirect Prerequisites: ");
            printResultSet.printObject(indirectPrerequisites);

        } catch (SQLException e) {
            exceptionhelper.handleSQLException(e);
        }
    }
}
